export type SignInData = {
    email: string
    password: string
  };
  
  export type Client = {
    id: string
    name: string
    updated_at: string
    created_at: string
  }
  
  export type RegisterClient = {
    name: string
  }
  
  export type RegisterData = {
    name: string
    email: string
    senha: string
    confirmeSenha: string
  }