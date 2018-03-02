export default class SubError extends Error {
  constructor(errors) {
    super(errors);

    const multiStack = errors.reduce((str, error) => {
      str += `\n\n${error.stack}`;
      return str;
    }, '');

    this.message = `SubError ${multiStack}`;
  }
}
