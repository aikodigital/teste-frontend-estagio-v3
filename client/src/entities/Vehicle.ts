export class Vehicle {
    private id: string;
    private name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
      }


      honk() {
        console.log(this.id, this.name)
      }


}
  

