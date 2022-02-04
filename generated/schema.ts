// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Service extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("creator", Value.fromString(""));
    this.set("owner", Value.fromString(""));
    this.set("categorie", Value.fromString(""));
    this.set("area", Value.fromString(""));
    this.set("title", Value.fromString(""));
    this.set("price", Value.fromBigInt(BigInt.zero()));
    this.set("duration", Value.fromBigInt(BigInt.zero()));
    this.set("onSale", Value.fromBoolean(false));
    this.set("onDispute", Value.fromBoolean(false));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Service entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Service entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Service", id.toString(), this);
    }
  }

  static load(id: string): Service | null {
    return changetype<Service | null>(store.get("Service", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get creator(): string {
    let value = this.get("creator");
    return value!.toString();
  }

  set creator(value: string) {
    this.set("creator", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get categorie(): string {
    let value = this.get("categorie");
    return value!.toString();
  }

  set categorie(value: string) {
    this.set("categorie", Value.fromString(value));
  }

  get area(): string {
    let value = this.get("area");
    return value!.toString();
  }

  set area(value: string) {
    this.set("area", Value.fromString(value));
  }

  get subArea(): string | null {
    let value = this.get("subArea");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set subArea(value: string | null) {
    if (!value) {
      this.unset("subArea");
    } else {
      this.set("subArea", Value.fromString(<string>value));
    }
  }

  get title(): string {
    let value = this.get("title");
    return value!.toString();
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get description(): string | null {
    let value = this.get("description");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set description(value: string | null) {
    if (!value) {
      this.unset("description");
    } else {
      this.set("description", Value.fromString(<string>value));
    }
  }

  get price(): BigInt {
    let value = this.get("price");
    return value!.toBigInt();
  }

  set price(value: BigInt) {
    this.set("price", Value.fromBigInt(value));
  }

  get duration(): BigInt {
    let value = this.get("duration");
    return value!.toBigInt();
  }

  set duration(value: BigInt) {
    this.set("duration", Value.fromBigInt(value));
  }

  get onSale(): boolean {
    let value = this.get("onSale");
    return value!.toBoolean();
  }

  set onSale(value: boolean) {
    this.set("onSale", Value.fromBoolean(value));
  }

  get onDispute(): boolean {
    let value = this.get("onDispute");
    return value!.toBoolean();
  }

  set onDispute(value: boolean) {
    this.set("onDispute", Value.fromBoolean(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("role", Value.fromString(""));
    this.set("categorie", Value.fromString(""));
    this.set("reputation", Value.fromI32(0));
    this.set("banned", Value.fromBoolean(false));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save User entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get role(): string {
    let value = this.get("role");
    return value!.toString();
  }

  set role(value: string) {
    this.set("role", Value.fromString(value));
  }

  get categorie(): string {
    let value = this.get("categorie");
    return value!.toString();
  }

  set categorie(value: string) {
    this.set("categorie", Value.fromString(value));
  }

  get reputation(): i32 {
    let value = this.get("reputation");
    return value!.toI32();
  }

  set reputation(value: i32) {
    this.set("reputation", Value.fromI32(value));
  }

  get services(): Array<string> | null {
    let value = this.get("services");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set services(value: Array<string> | null) {
    if (!value) {
      this.unset("services");
    } else {
      this.set("services", Value.fromStringArray(<Array<string>>value));
    }
  }

  get banned(): boolean {
    let value = this.get("banned");
    return value!.toBoolean();
  }

  set banned(value: boolean) {
    this.set("banned", Value.fromBoolean(value));
  }
}
