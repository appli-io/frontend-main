import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';

import { Contact, Country } from './contacts.types';

@Injectable({providedIn: 'root'})
export class ContactsService {
    // Private
    private _contact: BehaviorSubject<Contact | null> = new BehaviorSubject(null);
    private _contacts: BehaviorSubject<Contact[] | null> = new BehaviorSubject(null);
    private _countries: BehaviorSubject<Country[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for contact
     */
    get contact$(): Observable<Contact> {
        return this._contact.asObservable();
    }

    /**
     * Getter for contacts
     */
    get contacts$(): Observable<Contact[]> {
        return this._contacts.asObservable();
    }

    /**
     * Getter for countries
     */
    get countries$(): Observable<Country[]> {
        return this._countries.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get contacts
     */
    getContacts(): Observable<Contact[]> {
        return this._httpClient.get<Contact[]>('api/apps/contacts/all').pipe(
            tap((contacts) => {
                this._contacts.next(contacts);
            }),
        );
    }

    /**
     * Search contacts with given query
     *
     * @param query
     */
    searchContacts(query: string): Observable<Contact[]> {
        return this._httpClient.get<Contact[]>('api/apps/contacts/search', {
            params: {query},
        }).pipe(
            tap((contacts) => {
                this._contacts.next(contacts);
            }),
        );
    }

    /**
     * Get contact by id
     */
    getContactById(id: string): Observable<Contact> {
        return this._contacts.pipe(
            take(1),
            map((contacts) => {
                // Find the contact
                const contact = contacts.find(item => item.id === id) || null;

                // Update the contact
                this._contact.next(contact);

                // Return the contact
                return contact;
            }),
            switchMap((contact) => {
                if (!contact) {
                    return throwError('Could not found contact with id of ' + id + '!');
                }

                return of(contact);
            }),
        );
    }

    /**
     * Create contact
     */
    createContact(): Observable<Contact> {
        return this.contacts$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.post<Contact>('api/apps/contacts/contact', {}).pipe(
                map((newContact) => {
                    // Update the contacts with the new contact
                    this._contacts.next([ newContact, ...contacts ]);

                    // Return the new contact
                    return newContact;
                }),
            )),
        );
    }

    /**
     * Update contact
     *
     * @param id
     * @param contact
     */
    updateContact(id: string, contact: Contact): Observable<Contact> {
        return this.contacts$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.patch<Contact>('api/apps/contacts/contact', {
                id,
                contact,
            }).pipe(
                map((updatedContact) => {
                    // Find the index of the updated contact
                    const index = contacts.findIndex(item => item.id === id);

                    // Update the contact
                    contacts[index] = updatedContact;

                    // Update the contacts
                    this._contacts.next(contacts);

                    // Return the updated contact
                    return updatedContact;
                }),
                switchMap(updatedContact => this.contact$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {
                        // Update the contact if it's selected
                        this._contact.next(updatedContact);

                        // Return the updated contact
                        return updatedContact;
                    }),
                )),
            )),
        );
    }

    /**
     * Get countries
     */
    getCountries(): Observable<Country[]> {
        return this._httpClient.get<Country[]>('api/apps/contacts/countries').pipe(
            tap((countries) => {
                this._countries.next(countries);
            }),
        );
    }

    /**
     * Update the avatar of the given contact
     *
     * @param id
     * @param avatar
     */
    uploadAvatar(id: string, avatar: File): Observable<Contact> {
        return this.contacts$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.post<Contact>('api/apps/contacts/avatar', {
                id,
                avatar
            }, {headers: {'Content-Type': avatar.type}})
                .pipe(
                    map((updatedContact) => {
                        // Find the index of the updated contact
                        const index = contacts.findIndex(item => item.id === id);

                        // Update the contact
                        contacts[index] = updatedContact;

                        // Update the contacts
                        this._contacts.next(contacts);

                        // Return the updated contact
                        return updatedContact;
                    }),
                    switchMap(updatedContact => this.contact$.pipe(
                        take(1),
                        filter(item => item && item.id === id),
                        tap(() => {
                            // Update the contact if it's selected
                            this._contact.next(updatedContact);

                            // Return the updated contact
                            return updatedContact;
                        }),
                    )),
                )),
        );
    }
}
