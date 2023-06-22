export interface IntroduceSession{
  addresses: addresses[]
  expiresAt: string
  id: string
  __typename: string
}

interface addresses{
  address: string;
  __typename: string
}
