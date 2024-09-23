import  { Entity, Fields } from "remult";
import bcrypt from 'bcrypt'

@Entity("users", { allowApiCrud: true })
export class User {
   @Fields.uuid()
   id = '';

   @Fields.string()
   name = '';

   @Fields.string()
   email = '';

   @Fields.string<User>({
      includeInApi: false,
      saving: async (_, record) => {
        record.value = await bcrypt.hash(record.value, 7)
      }
    })
   password = '';
}