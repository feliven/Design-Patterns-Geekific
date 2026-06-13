abstract class Client {
  constructor(
    protected name: string,
    protected address: string,
    protected number: string,
  ) {}
}

class Resident extends Client {
  constructor(
    name: string,
    address: string,
    number: string,
    private insuranceClass: string,
  ) {
    super(name, address, number);
    this.insuranceClass = insuranceClass;
  }

  getName(): string {
    return this.name;
  }
}

class Company extends Client {
  constructor(
    name: string,
    address: string,
    number: string,
    private nbrOfEmployees: number,
  ) {
    super(name, address, number);
    this.nbrOfEmployees = nbrOfEmployees;
  }
}

class Bank extends Client {
  constructor(
    name: string,
    address: string,
    number: string,
    private branchesInsured: number,
  ) {
    super(name, address, number);
    this.branchesInsured = branchesInsured;
  }
}

class Restaurant extends Client {
  constructor(
    name: string,
    address: string,
    number: string,
    private availableAbroad: boolean,
  ) {
    super(name, address, number);
    this.availableAbroad = availableAbroad;
  }
}
