import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import useAuth from "../../../hooks/useAuth"
import Home from "../../../pages"

jest.mock("../../../hooks/useAuth")
const useRouter = jest.spyOn(require("next/router"), "useRouter")
const router = {
  push: jest.fn(),
}

describe("<Home />", () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => router)
  })

  test("is rendered when the user is not auth", () => {
    const useAuthData = {
      auth: {},
      setAuth: jest.fn(),
      loading: false,
      startSession: jest.fn(),
    }
    useAuth.mockImplementation(() => useAuthData)
    render(<Home />)
    screen.getByText("Welcome to SchoolAdm")
    expect(useRouter).toBeCalledTimes(1)
  })
  test("is pushing to next route when the user is auth", () => {
    const useAuthData = {
      auth: {
        _id: "test_auth_id",
        name: "test_auth_name",
        rank: 1,
      },
      setAuth: jest.fn(),
      loading: false,
      startSession: jest.fn(),
    }
    useAuth.mockImplementation(() => useAuthData)
    render(<Home />)
    expect(router.push).toHaveBeenCalledTimes(1)
  })
})
