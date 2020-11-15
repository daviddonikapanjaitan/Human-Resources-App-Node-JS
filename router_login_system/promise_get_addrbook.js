const model = require("../models/index");

const getXAddrBook = () => new Promise((resolve, reject) => {
    resolve(model.x_addrbook.findAll({}));
});

async function getresult(){
    const result = await getXAddrBook();
    console.log(result);
}

getresult();