import { fireEvent, getByLabelText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogIn from "./LogIn";
import '@testing-library/jest-dom/extend-expect';

test('on initial render, the login button is disabled', async () => {
    render(< LogIn />)
    expect(await screen.findByRole('button', { name: /log in/i })).toBeDisabled();
})


// test('if there is text in username and password field Log in button should be enabled', async () => {
//     render(< LogIn />)
//     userEvent.type(screen.getByPlaceholderText(/username/i), "Hello");
//     userEvent.type(screen.getByPlaceholderText(/password/i), "Hello");

//     screen.getByRole('');
//     // expect(await screen.findByRole('button', { name: /log in/i })).toBeEnabled();
// })

test('username should be empty', () => {
    render(< LogIn />)
    const input = screen.getByLabelText(/username/i);
    expect(input.value).toBe("");
})

test('username should update', () => {
    render(< LogIn />)
    const input = screen.getByLabelText(/username/i);
    const testValue = "test";
    fireEvent.change(input, { target: { value: testValue } })
    expect(input.value).toBe(testValue);
})

test('password should update', () => {
    render(< LogIn />)
    const input = screen.getByLabelText(/password/i);
    const testValue = "test";
    fireEvent.change(input, { target: { value: testValue } })
    expect(input.value).toBe(testValue);
})

test('submit button should be enabled when username and password has value', () => {
    render(< LogIn />)
    const passwordEl = screen.getByLabelText(/password/i);
    const usernameEl = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /log in/i });

    const testValue = "test";
    fireEvent.change(passwordEl, { target: { value: testValue } })

    fireEvent.change(usernameEl, { target: { value: testValue } })

    expect(submitButton).not.toBeDisabled();
})
