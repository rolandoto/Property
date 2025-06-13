"use server"
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { z } from 'zod';
import { InitialFormState } from './definitions';
import { signIn } from '@/pages/auth';
import { AuthError } from 'next-auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/**
 * Validates invoice form input.
 * @param {string} id - The UUID of the invoice.
 * @param {string} customerId - The ID of the selected customer.
 * @param {number} amount - The amount of the invoice (must be greater than 0).
 * @param {string} status - The status of the invoice ('pending' or 'paid').
 * @param {string} date - The invoice date as a string.
 */

  const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({invalid_type_error: 'Please select a customer.',}),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {invalid_type_error: 'Please select an invoice status.',}),
    date: z.string(),
  });

  //CREATE invoinces
    const CreateInvoice = FormSchema.omit({ id: true, date: true });
 
    export async function createInvoince(prevState:InitialFormState,formData:FormData){

        const validatedFields  = CreateInvoice.safeParse({
            customerId: formData.get('customerId'),
            amount: formData.get('amount'),
            status: formData.get('status'),
        });


        if (!validatedFields.success) {
            return {
              errors: validatedFields.error.flatten().fieldErrors,
              message: 'Missing Fields. Failed to Create Invoice.',
            };
          }

        const {amount,customerId,status}  = validatedFields.data
        const amountInCents = amount * 100;
        const date = new Date().toISOString().split('T')[0];
        
        try {
            await sql`
              INSERT INTO invoices (customer_id, amount, status, date)
              VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
            `;
          } catch (error) {
            // If a database error occurs, return a more specific error.
            return {
              message: 'Database Error: Failed to Create Invoice.',
            };
          }

        revalidatePath('/dashboard/invoices');
        redirect('/dashboard/invoices');
    }


 //UPDATE invoinces 

const UpdateInvoince =FormSchema.omit({ id: true, date: true });

export async function updateInvoice(  id:string,prevState:InitialFormState, formData:FormData){

    const validatedFields  = UpdateInvoince.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
            };
    }

     const {amount,customerId,status}  = validatedFields.data
    const amountInCents = amount * 100;
    
    try {
        await sql`
          UPDATE invoices
          SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
          WHERE id = ${id}
        `;
      } catch (error) {
        
        return { message: 'Database Error: Failed to Update Invoice.' };
      }
   

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}   


     //DELETE invoinces 


export async function deleteInvoice(id: string) {

   // throw new Error('Failed to Delete Invoice'); error get try again

    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    }


  export async function authenticate( prevState: string | undefined,formData:FormData){

      try {

          await signIn("credentials",formData)

      } catch (error) {
        
          if(error  instanceof AuthError)
              switch (error.type){
                  case 'CredentialsSignin':
                      return 'Invalid credentials.';
                  default:
                      return 'Something went wrong.';
              }
      }

  }