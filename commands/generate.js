const fs = require("fs");
const chalk = require("chalk");
const pluralize = require("pluralize");

class Generator {
  feature = null;
  module = null;
  number = null;
  moduleFolder = null;
  templateFolder = "./templates";
  baseFolder = "./src/features";
  templates = {
    route: `${this.templateFolder}/route.txt`,
    routeCrud: `${this.templateFolder}/route-crud.txt`,
    controller: `${this.templateFolder}/controller.txt`,
    service: `${this.templateFolder}/service.txt`,
  };
  replacer = Array(3)
    .fill()
    .map((x, i) => `%replacer${i + 1}%`);

  constructor(path, number = null) {
    const [feature, module] = path.split("/");
    this.feature = feature;
    this.module = module;
    this.number = number;
  }

  generate() {
    this._generateModuleFolderName();
    this._checkDirRec(this.moduleFolder);
    this._generateRoutesFile();
    this._generateControllerFile();
    this._generateServiceFile();
  }

  _generateModuleFolderName() {
    const number = (
      "0" +
      (this.number ||
        (() => {
          const featureFolder = `${this.baseFolder}/${this.feature}`;
          this._checkDirRec(featureFolder);
          const n = fs
            .readdirSync(featureFolder)
            .map((x) => +`${x[0]}${x[1]}`)
            .filter((x) => !isNaN(x))
            .sort((a, b) => (a < b ? 1 : -1))[0];
          return typeof n === 'number' ? n + 1 : null;
        })() ||
        0)
    ).slice(-2);

    this.moduleFolder = `${this.baseFolder}/${this.feature}/${number}_${this.module}`;
  }

  _checkDirRec(path) {
    path = path.split("/");
    let actualPath = "";
    while (path.length) {
      actualPath += path.splice(0, 1)[0] + "/";
      if (!fs.existsSync(actualPath)) {
        fs.mkdirSync(actualPath);
      }
    }
  }

  _generateRoutesFile() {
    const path = `${this.baseFolder}/${this.feature}/${this.feature}.route.js`;

    if (!fs.existsSync(path)) {
      fs.writeFileSync(
        path,
        fs
          .readFileSync(this.templates.route, "utf8")
          .replaceMany(this.replacer, [this.feature])
      );
    }

    // Create CRUD Methods
    const actualFileLines = fs.readFileSync(path, "utf8").split("\n");

    const indexToPush =
      actualFileLines.findIndex((x) => x.includes("server.use")) - 1;
    const newLines = fs
      .readFileSync(this.templates.routeCrud, "utf8")
      .replaceMany(this.replacer, [
        this.module,
        pluralize.singular(this.module),
      ])
      .split("\n");
    actualFileLines.splice(indexToPush, 0, ...newLines);

    fs.writeFileSync(path, actualFileLines.join("\n"));
  }

  _generateControllerFile() {
    const path = `${this.moduleFolder}/${this.module}.controller.js`;

    if (!fs.existsSync(path)) {
      fs.writeFileSync(
        path,
        fs
          .readFileSync(this.templates.controller, "utf8")
          .replaceMany(this.replacer, [
            this.module,
            pluralize.singular(this.module),
          ])
      );
    }
  }

  _generateServiceFile() {
    const path = `${this.moduleFolder}/${this.module}.service.js`;

    if (!fs.existsSync(path)) {
      fs.writeFileSync(
        path,
        fs
          .readFileSync(this.templates.service, "utf8")
          .replaceMany(this.replacer, [this.feature, this.module])
      );
    }
  }
}

Object.assign(String.prototype, {
  replaceMany(replacerPatterns, replacersValue) {
    return replacerPatterns.reduce(
      (ac, x, i) => ac.replace(new RegExp(x, "g"), replacersValue[i] || x),
      this.toString()
    );
  },
});

module.exports = function (path, number) {
  try {
    const generator = new Generator(path, +number || null);
    generator.generate();
    console.log(chalk.green("Feature generated successfully!"));
  } catch (error) {
    console.error(chalk.red("Error in feature generate!"));
    console.error(error);
  }
};
