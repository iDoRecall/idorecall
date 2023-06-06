import * as React from 'react';
import { useEffect, useState } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const ReactView = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error(error));
    }, []);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const name = formData.get('name');
        const email = formData.get('email');

        console.log(name, email);

        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ name, email }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1 className={ 'idr' }>React Sample</h1>
            <form onSubmit={ handleFormSubmit }>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text"/>

                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email"/>

                <button type="submit">Submit</button>
            </form>

            { users.map(user => (
                <div key={ user.id }>
                    <h2>{ user.name }</h2>
                    <p>{ user.email }</p>
                </div>
            )) }
        </div>
    );
};
