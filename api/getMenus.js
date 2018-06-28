const getMenus = () => {
  return new Promise((resolve, reject) => {
    const isServer = typeof window === 'undefined';
    if (isServer) {
      const fs = eval('require("fs")');
      const appRoot = eval('require("app-root-path")');

      let menus = [];

      fs.readdir(`${appRoot}/json/`, (err, files) => {
        if (err) {
          reject({
            err,
          });
        }

        files.forEach(file => {
          let obj = {};
          obj = JSON.parse(fs.readFileSync(`${appRoot}/json/${file}`, 'utf8'));

          menus.push(obj);
        });

        resolve({
          data: menus,
        });
      });
    }
  });
};

export default getMenus;
