module.exports=function(env){
    // console.log(require(`./webpack.${env}.js`)().module.rules[4])
    return require(`./webpack.${env}.js`)();  //dev prod字符串魔板
}