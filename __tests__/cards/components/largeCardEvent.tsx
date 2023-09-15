import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import LargeCardEvent from "../../../components/cards/LargeCardEvent"
import useAuth from "../../../hooks/useAuth"
import useEvent from "../../../hooks/useEvent"

jest.mock("../../../hooks/useAuth")
jest.mock("../../../hooks/useEvent")
const useEventMockData = {
  deleteEvent: jest.fn(),
}
describe("<LargeCardEvent />", () => {
  beforeEach(() => {
    useEvent.mockImplementation(() => useEventMockData)
  })

  test("is rendered student and teacher version", () => {
    const auth = {
      _id: "test_auth_id",
      name: "test_auth_name",
      rank: 1,
    }
    useAuth.mockImplementation(() => auth)
    const data: object = {
      _id: "test_id",
      title: "test title",
    }
    render(<LargeCardEvent data={data} />)
    screen.getByText("View Event")
    expect(screen.queryByText("delete")).not.toBeInTheDocument()
  })
  test("is rendered user admin version", () => {
    const authMockData = {
      auth: {
        _id: "test_auth_id",
        name: "test_auth_name",
        rank: 3,
      },
    }
    useAuth.mockImplementation(() => authMockData)
    const data: object = {
      _id: "test_id",
      title: "test title",
    }
    render(<LargeCardEvent data={data} />)
    expect(screen.getByText("delete")).toBeInTheDocument()
  })
})
