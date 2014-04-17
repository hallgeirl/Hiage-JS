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
    vectorPool.push([0,0])