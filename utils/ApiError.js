class ApiError {
  constructor(status, message) {
    this.message = message;
    this.status = status;
  }
}
module.exports = ApiError;
