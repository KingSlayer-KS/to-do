
exports.getdate = function(){
    let today=new Date();
    const options = { weekday: 'long', 
                    day: 'numeric',
                    month: 'long'  };
    let Day=today.toLocaleDateString("en-US",options);

    return Day;
};