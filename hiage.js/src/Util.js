function clone(obj, recursed) {
    //Check for value type
    if (typeof (obj) != "object")
        return obj;

    if (obj instanceof Array) {
        return cloneArray(obj);
    }
    
    var newObj = {};
    for (var prop in obj) {
        if (typeof (obj[prop]) == "object")
            newObj[prop] = clone(obj[prop], true);
        else
            newObj[prop] = obj[prop];
    }
    return newObj;
}

function cloneArray(obj) {
    var result = []
    for (var i = 0; i < obj.length; i++) {
        result.push(clone(obj[i]));
    }

    return result;
}

function getAngleFromDirection(direction) {
	return Math.atan2(direction[1],direction[0]);
}

function getDirectionFromAngle(angle, dest) {
    dest[0] = Math.cos(angle)
    dest[1] = Math.sin(angle)
}

function vectorAdd(vector1, vector2, dest) {
    dest[0] = vector1[0]+vector2[0]
    dest[1] = vector1[1]+vector2[1]
}

function vectorLength(vector) {
	return Math.sqrt(vector[0]*vector[0]+vector[1]*vector[1]);
}

function vectorDot(vector1, vector2) {
	return vector1[0]*vector2[0]+vector1[1]*vector2[1];
}

function vectorNormalize(vector) {
	var length = vectorLength(vector);
	return [vector[0]/length, vector[1]/length];
}

function vectorInvert(vector) {
    return [-vector[0], -vector[1]];
}

function vectorScale(vector, scalar, dest) {
    dest[0] = vector[0]*scalar
    dest[1] = vector[1]*scalar
}

function vectorDifference(vector1, vector2) {
    return [vector1[0] - vector2[0], vector1[1] - vector2[1]];
}

function createVector() {
    if (vectorPool.length == 0)
    {
        for (var i = 0; i < 100; i++)
            vectorPool.push([0,0])
    }
    return vectorPool.pop();
}

function releaseVector(vector) {
    vector[0] = 0;
    vector[1] = 0;
    vectorPool.push(vector)
}

function createObject() {
    if (objectPool.length == 0) {
        for (var i = 0; i < 100; i++)
            objectPool.push([0, 0])
    }
    return objectPool.pop();
}

function releaseObject(obj) {
    for (var prop in obj)
        delete obj[prop]
}

var vectorPool = []
for (var i = 0; i < 10000; i++)
    vectorPool.push([0, 0])


/*
Object pooling. From http://gamealchemist.wordpress.com/2013/02/02/no-more-garbage-pooling-objects-built-with-constructor-functions/
*/

Object.defineProperty(Function.prototype, 'setupPool', { value: setupPool });

// setupPool. 
// setup a pool on the function, add a pnew method to retrieve objects
// from the pool, and add a hidden pdispose method to the instances so
// they can be sent back on the pool.
// use : MyPureJSClass.setupPool(100);
// then : var myInstance = MyPureJSClass.pnew(23, 'arg 2', ..)
function setupPool(newPoolSize) {
    if (!(newPoolSize >= 0)) throw ('setupPool takes a size >= 0 as argument.');
    this.pool = this.pool || [];
    this.poolSize = this.poolSize || 0;
    this.pnew = pnew;
    Object.defineProperty(this.prototype, 'pdispose', { value: pdispose });
    // pre-fill the pool.
    while (this.poolSize < newPoolSize) { (new this()).pdispose(); }
    // reduce the pool size if new size is smaller than previous size.
    if (this.poolSize > newPoolSize) {
        this.poolSize = newPoolSize;
        this.pool.length = newPoolSize; // allow for g.c.
    }

    disposeBalance += newPoolSize;
}

var disposeBalance = 0;

// pnew : method of the constructor function. 
//        returns an instance, that might come from the pool
//        if there was some instance left,
//        or created new, if the pool was empty.	
// instance is initialized the same way it would be when using new
function pnew() {
    disposeBalance++;
    var pnewObj = null;
    
    if (this.poolSize !== 0) {              // the pool contains objects : grab one
        this.poolSize--;
        pnewObj = this.pool[this.poolSize];
        this.pool[this.poolSize] = null;
    } else {
        console.log(this)
        pnewObj = new this();             // the pool is empty : create new object
    }

    this.apply(pnewObj, arguments);           // initialize object
    return pnewObj;
}

// pdispose : release on object that will return in the pool.
//             if a dispose method exists, it will get called.
//            do not re-use a pdisposed object. 
function pdispose() {
    disposeBalance--;
    var thisCttr = this.constructor;
    if (this.dispose) this.dispose();  // Call dispose if defined
    thisCttr.pool[thisCttr.poolSize++] = this;  // throw the object back in the pool 
}