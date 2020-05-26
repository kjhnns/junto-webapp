/* eslint-disable */
import React from 'react'
import * as Gatsby from 'gatsby'
import { render, user, fireEvent, wait } from '@test'

import { PureLoginPage as Page } from '../login'

const mockNavigate = jest.fn()
const navigateSpy = jest.spyOn(Gatsby, 'navigate')

describe('<LoginPage>', () => {
  beforeEach(() => {
    // prevent: window.___navigate is not a function error
    // gatsby use global ___navigate function that is not available in test
    // we need to mock this
    // eslint-disable-next-line no-underscore-dangle
    global.___navigate = mockNavigate
  })

  // eslint-disable-next-line jest/expect-expect
  test('Renders', async () => {
    const { getByRole } = render(<Page />)
    getByRole(`heading`)

    await wait()
  })

  // test('Submitting correct credentials should result in redirect and session cookie storedin in localStorage', async () => {
  //   // Mock a successful API call
  //   // axios.post.mockResolvedValueOnce({ data: { success: true } })

  //   const { getByLabelText, getByRole } = render(<Page />)

  //   // Type in credentials and click submit button
  //   const email = 'hello@junto.com'
  //   userEvent.type(getByLabelText('Email'), email)
  //   await wait()
  //   expect(getByLabelText('Email')).toHaveAttribute('value', email)

  //   // Type in credentials and click submit button
  //   const password = 'sECuRiTy'
  //   userEvent.type(getByLabelText('Password'), password)
  //   await wait()
  //   expect(getByLabelText('Password')).toHaveAttribute('value', password)

  //   // Click submit button
  //   fireEvent.click(getByRole('button'))

  //   // // Wait for request to resolve
  //   // await wait()
  //   // // Check whether API request has been called once with correct payload
  //   // expect(axios.post).toHaveBeenCalledTimes(1)
  //   // expect(axios.post).toHaveBeenCalledWith(
  //   //   'mock.api.de/JointDepot/ConfirmInvitation',
  //   //   {
  //   //     guID: guid,
  //   //     verificationCode: code,
  //   //   }
  //   // )

  //   // // We store the credentials (GUID + matching verification code) in
  //   // // localStorage, because we need to pass it to the next page.
  //   // const cachedCredentials = localStorage.getItem('jointDepotInvitation')
  //   // expect(JSON.parse(cachedCredentials)).toEqual({
  //   //   guid,
  //   //   verificationCode: code,
  //   // })

  //   // // A successful request should result in a redirect
  //   // expect(navigateSpy).toHaveBeenCalledTimes(1)
  //   // expect(navigateSpy).toHaveBeenCalledWith('/gd/einladung/1')
  // })
})
