import React from 'react';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Block from './';

/**
 * Block Testing
 * Please Complete these tests
 */
const configure = (hash="") => {
    const onHash = jest.fn();
    const onDelete = jest.fn()

    const { getByText, getByRole } = render(<Block block={1} hash={hash} onHash={onHash} onDelete={onDelete} isLast={true} />)
    return { onHash, onDelete, getByText, getByRole }
}

afterEach(cleanup);

/**
 * Hash is set on load
 * We need to check that when component is rendered, 
 * onHash is called and the hash change is reflected in the component
 */
it('Hash is set on load', () => {
  const { onHash } = configure();
  expect(onHash).toHaveBeenCalled();
});

/**
 * Shows not valid text
 * On render, the text 'Not Valid' should be in the document as the hash is not valid
 */
it("Shows not valid text", () => {
    const { getByText } = configure();
    expect(getByText('Not Valid')).toBeInTheDocument();
});

/**
 * Delete is called correctly
 * We need to make sure that when clicking on delete, the delete function is called
 */
it("Delete is called correctly", () => {
    const { onDelete, getByText } = configure();
    userEvent.click(getByText("Delete"));
    expect(onDelete).toHaveBeenCalled();
});

/**
 * Mining works correctly
 * We need to be able to click on mine and expect the block hash to now be valid
 * The text 'Valid' should also be in the document
 */
it("Mining works correctly", () => {
    const { getByText } = configure("0".repeat(64));
    userEvent.click(getByText("Mine"));
    expect(getByText("Valid")).toBeInTheDocument();

});

/**
 * Changing data effects hash
 * The data textarea can be change, 
 * we need to make sure the changes effect the hash and that onHash is called
 */
it("Changing data effects hash", () => {
    const { getByRole, onHash } = configure("0".repeat(64));
    userEvent.type(getByRole("textbox"), "abc");
    expect(onHash).toHaveBeenCalled();
})
