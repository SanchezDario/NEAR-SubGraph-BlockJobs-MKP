import { near, JSONValue, json, log, BigInt, TypedMap } from "@graphprotocol/graph-ts"
import { User, Service } from "../generated/schema"

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions;
  for (let i = 0; i < actions.length; i++) {
    handleAction(
      actions[i], 
      receipt.receipt, 
      receipt.outcome,
      receipt.block.header
    );
  }
}

function parseEvent(logData: string): TypedMap<string, JSONValue> {
  let outcomeLog = logData.toString();
  // log.info('outcomeLog {}', [outcomeLog]);

  let jsonData = json.try_fromString(outcomeLog);
  const jsonObject = jsonData.value.toObject();

  return jsonObject;
}

function handleAction(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  outcome: near.ExecutionOutcome,
  blockHeader: near.BlockHeader
): void {
  if (action.kind != near.ActionKind.FUNCTION_CALL) return;

  const methodName = action.toFunctionCall().methodName;

  for (let i = 0; i < outcome.logs.length; i++) {
    const logParsed = parseEvent(outcome.logs[i]);

    if (methodName == 'mint_service') {
      const logJson = logParsed.get('service_mint');
      if (!logJson) return;
      const data = logJson.toObject();

      const id = data.get('id');
      const creator_id = data.get('creator_id');
      const title = data.get('title');
      const description = data.get('description');
      const categories = data.get('categories');
      const price = data.get('price');
      const duration = data.get('duration');

      if (id == null || creator_id == null || title == null || description == null || categories == null || price == null || duration == null ) { 
        log.error("[data] don't exist", []); return; 
      }
      
      let service = new Service(id.toString());
      service.id = id.toString();
      service.creator = creator_id.toString();
      service.owner = creator_id.toString();
      service.title = title.toString();
      service.description = description.toString();
      service.categorie = categories.toString();
      service.area = description.toString();
      service.subArea = description.toString();
      service.price = price.toBigInt();
      service.duration = duration.toBigInt();
      service.onDispute = false;
      service.onSale = true;

      service.save();
    }

    else if (methodName == 'buy_service') {
      const logJson = logParsed.get('service_buy');
      if (!logJson) return;
      const data = logJson.toObject();

      const id = data.get('id');
      if (id == null) return;

      let service = Service.load(id.toString());
      if (!service) return;

      const new_owner = data.get('buyer_id');
      if (new_owner == null) return;
      service.owner = new_owner.toString();

      service.save();
    }

    else if (methodName == 'reclaim_service') {
      const logJson = logParsed.get('service_reclaim');
      if (!logJson) return;
      const data = logJson.toObject();

      const id = data.get('id');
      if (id == null) return;

      let service = Service.load(id.toString());
      if (!service) return;

      const new_owner = data.get('sender_id');
      if (new_owner == null) return;
      service.owner = new_owner.toString();

      service.save();
    }

    else if (methodName == 'return_service_by_admin') {
      const logJson = logParsed.get('service_return');
      if (!logJson) return;
      const data = logJson.toObject();

      const id = data.get('id');
      if (id == null) return;

      let service = Service.load(id.toString());
      if (!service) return;

      const new_owner = data.get('creator_id');
      if (new_owner == null) return;
      service.owner = new_owner.toString();

      service.save();
    }

    else if (methodName == 'update_service') {
      const logJson = logParsed.get('service_update_metadata');
      if (!logJson) return;
      const data = logJson.toObject();

      const id = data.get('id');
      const title = data.get('title');
      const description = data.get('description');
      const categories = data.get('categories');
      const price = data.get('price');
      const duration = data.get('duration');

      if (id == null || title == null || description == null || categories == null || price == null || duration == null ) { 
        log.error("[data] don't exist", []); return; 
      }
      
      let service = Service.load(id.toString());
      if (!service) return;

      service.id = id.toString();
      service.title = title.toString();
      service.description = description.toString();
      service.categorie = categories.toString();
      service.area = description.toString();
      service.subArea = description.toString();
      service.price = price.toBigInt();
      service.duration = duration.toBigInt();

      service.save();
    }


    else if (methodName == 'update_service_on_sale') {
      const logJson = logParsed.get('service_update_on_sale');
      if (!logJson) return;
      const data = logJson.toObject();

      const id = data.get('id');
      if (id == null) return;

      let service = Service.load(id.toString());
      if (!service) return;

      const on_sale = data.get('on_sale');
      if (on_sale == null) return;
      service.onSale = on_sale.toBool();

      service.save();
    }


    else if (methodName == 'add_user') {
      const logJson = logParsed.get('user_new');
      if (!logJson) return;
      const data = logJson.toObject();

      const id = data.get('id');
      const roles = data.get('roles');
      const user_data = data.get('data');
      const reputation = data.get('reputation');

      if (id == null || roles == null || user_data == null || reputation == null) return;
      let user = new User(id.toString());

      user.id = id.toString();
      user.role = roles.toString();
      user.categorie = user_data.toString();
      user.services = [];
      user.reputation = 0;
      user.banned = false;

      user.save();
    }


    else if (methodName == 'set_user_role') {
      const logJson = logParsed.get('user_update_dates');
      if (!logJson) return;
      const data = logJson.toObject();

      const id = data.get('id');
      const roles = data.get('roles');

      let user = User.load('id');
      if (!user || roles == null) return;

      user.role = roles.toString();

      user.save();
    }


    else if (methodName == 'update_user_data') {
      const logJson = logParsed.get('user_update_roles');
      if (!logJson) return;
      const data = logJson.toObject();

      const id = data.get('id');
      const dates = data.get('data');

      let user = User.load('id');
      if (!user || dates == null) return;

      user.role = dates.toString();

      user.save();
    }
  }
}