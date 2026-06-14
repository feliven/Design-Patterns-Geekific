abstract class Client {
  constructor(
    protected name: string,
    protected address: string,
    protected number: string,
  ) {}

  abstract sendMail(): void;
}

export class Resident extends Client {
  constructor(
    name: string,
    address: string,
    number: string,
    readonly insuranceClass: string,
  ) {
    super(name, address, number);
    this.insuranceClass = insuranceClass;
  }

  getName(): string {
    return this.name;
  }

  sendMail(): void {
    console.log("Sending mail about medical insurance...");
  }
}

export class Company extends Client {
  constructor(
    name: string,
    address: string,
    number: string,
    readonly nbrOfEmployees: number,
  ) {
    super(name, address, number);
    this.nbrOfEmployees = nbrOfEmployees;
  }

  sendMail(): void {
    console.log("Sending employees and equipment insurance mail...");
  }
}

export class Bank extends Client {
  constructor(
    name: string,
    address: string,
    number: string,
    readonly branchesInsured: number,
  ) {
    super(name, address, number);
    this.branchesInsured = branchesInsured;
  }

  sendMail(): void {
    console.log("Sending mail about theft insurance...");
  }
}

export class Restaurant extends Client {
  constructor(
    name: string,
    address: string,
    number: string,
    readonly availableAbroad: boolean,
  ) {
    super(name, address, number);
    this.availableAbroad = availableAbroad;
  }

  sendMail(): void {
    console.log("Sending mail about fire and food insurance...");
  }
}
