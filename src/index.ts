type ContactWithEmail = { email: string } & Record<string, string>

export class LoopsClient {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string, baseUrl = 'https://app.loops.so/api/v1') {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    private getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${this.apiKey}`);
        return headers;
    }

    async addContact(contact: ContactWithEmail) {
        const response = await fetch(`${this.baseUrl}/contacts/create`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(contact)
        });

        return response.json();
    }

    async updateContact(contact: ContactWithEmail) {
        const response = await fetch(`${this.baseUrl}/contacts/update`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(contact)
        });

        return response.json();
    }

    async findContact(email: string) {
        const response = await fetch(`${this.baseUrl}/contacts/find?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        return response.json();
    }

    async deleteContactByEmail(email: string) {
        const response = await fetch(`${this.baseUrl}/contacts/delete`, {
            method: 'DELETE',
            headers: this.getHeaders(),
            body: JSON.stringify({ email })
        });

        return response.json();
    }

    async deleteContactById(userId: string) {
        const response = await fetch(`${this.baseUrl}/contacts/delete`, {
            method: 'DELETE',
            headers: this.getHeaders(),
            body: JSON.stringify({ userId })
        });

        return response.json();
    }

    async sendEvent(eventName: string, contact: ContactWithEmail) {
        const event = {
            ...contact,
            eventName,
        };

        const response = await fetch(`${this.baseUrl}/events/send`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(event)
        });

        return response.json();
    }
}
