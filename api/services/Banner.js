var schema = new Schema({
    name:{
      type: String,
      default:""
    },
    banner:{
      type:String,
      default:""
    },
    mobileBanner:{
      type:String,
      default:""
    },
    status: {
        type: String,
        enum:["true","false"]
    },
    order: {
      type: Number,
      default:0
  }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Banner', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
