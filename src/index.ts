type Contact = {
  id: string;
  email: string;
  source: string; // TODO: This is probably a literal union
  subscribed: boolean;
  userGroup: string;
  userId: string | null;
};

type ContactWithEmail = { email: string } & Record<string, string>;

type AddContactSuccess = { success: true; id: string };
type AddContactFailure = { success: false; message: string };
type AddContactResponse = AddContactSuccess | AddContactFailure;

type UpdateConactSuccess = { success: true; id: string };
type UpdateContactFailure = { success: false; message: string };
type UpdateContactResponse = UpdateConactSuccess | UpdateContactFailure;

type FindContactResponse = Contact[];

type DeleteContactSuccess = { success: true; message: string };
type DeleteContactFailure = { success: false; message: string };
type DeleteContactResponse = DeleteContactSuccess | DeleteContactFailure;

type SendEventResponse = { success: boolean };

type SendTransactionalEmailSuccess = { success: true };
type SendTransactionalEmailFailure = {
  success: false;
  error: {
    transactionalId: string;
    reason: string;
  };
};
type SendTransactionalEmailResponse =
  | SendTransactionalEmailSuccess
  | SendTransactionalEmailFailure;

export class LoopsClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = 'https://app.loops.so/api/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.apiKey}`);
    return headers;
  }

  async addContact(contact: ContactWithEmail): Promise<AddContactResponse> {
    const response = await fetch(`${this.baseUrl}/contacts/create`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(contact),
    });

    return response.json() as Promise<AddContactResponse>;
  }

  async updateContact(
    contact: ContactWithEmail
  ): Promise<UpdateContactResponse> {
    const response = await fetch(`${this.baseUrl}/contacts/update`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(contact),
    });

    return response.json() as Promise<UpdateContactResponse>;
  }

  async findContact(email: string): Promise<FindContactResponse> {
    const response = await fetch(
      `${this.baseUrl}/contacts/find?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: this.getHeaders(),
      }
    );

    return response.json() as Promise<FindContactResponse>;
  }

  async deleteContactByEmail(email: string): Promise<DeleteContactResponse> {
    const response = await fetch(`${this.baseUrl}/contacts/delete`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify({ email }),
    });

    return response.json() as Promise<DeleteContactResponse>;
  }

  async deleteContactById(userId: string): Promise<DeleteContactResponse> {
    const response = await fetch(`${this.baseUrl}/contacts/delete`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify({ userId }),
    });

    return response.json() as Promise<DeleteContactResponse>;
  }

  async sendEvent(
    eventName: string,
    contact: ContactWithEmail
  ): Promise<SendEventResponse> {
    const event = {
      ...contact,
      eventName,
    };

    const response = await fetch(`${this.baseUrl}/events/send`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(event),
    });

    return response.json() as Promise<SendEventResponse>;
  }

  async sendTransactionalEmail(
    email: string,
    transactionalId: string,
    dataVariables: Record<string, string>
  ): Promise<SendTransactionalEmailResponse> {
    const input = {
      transactionalId,
      email,
      dataVariables,
    };

    const response = await fetch(`${this.baseUrl}/transactional`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(input),
    });

    return response.json() as Promise<SendTransactionalEmailResponse>;
  }
}
