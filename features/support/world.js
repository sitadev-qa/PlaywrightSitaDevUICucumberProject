const { World, setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
    this.createdUsername = undefined;
  }
}

setWorldConstructor(CustomWorld);
