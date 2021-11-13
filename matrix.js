module.exports =  class Matrix {
  constructor(input) {
    input = input.split(";");
    this.matrix = new Array(input.length);
    for (let i = 0; i < this.matrix.length; i++) {
      this.matrix[i] = input[i].trim().split(" ");
    }
  }

  print(){
      console.log(this.matrix);
  }
}
