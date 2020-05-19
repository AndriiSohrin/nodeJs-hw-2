const {rename, readdir, mkdir, rmdir} = require('fs')
const path = require('path');


mkdir(path.join(__dirname, 'test'), (err) => {
    if (err) {
        console.log(err)
    }
});

const copy = (oldPath, newPath) => {
    readdir(path.join(oldPath), (err, files) => {
        if (err) {
            console.log(err)
            return
        }
            for (let i = 0; i < files.length; i++) {
                rename(path.join(__dirname, oldPath, files[i]), path.join(__dirname, newPath, files[i]), (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
    })
};


const fun = () => {
    return new Promise((resolve) => setTimeout(resolve));
};
fun()
    .then(() => {
        copy(`1800`, `test`);
        return fun()
    })

    .then(() => {
        copy(`2000`, `1800`);
        return fun()
    })

    .then(() => {
        copy(`test`, `2000`);
        return fun()
    })

    .then(() => {
        rmdir(path.join(__dirname, 'test'), (err) => {
            if (err) {
                console.log(err)
            }
        })
    })
