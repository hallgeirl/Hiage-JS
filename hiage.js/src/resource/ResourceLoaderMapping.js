define(["hiage.js/resource/ObjectLoader", "hiage.js/resource/AudioLoader"],
    function (ObjectLoader, AudioLoader) {
        return [
            { type: "object", loader: ObjectLoader },
            { type: "audio", loader: AudioLoader }
        ]
    });