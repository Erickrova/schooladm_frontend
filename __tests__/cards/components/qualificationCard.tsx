import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import QualificationCard from "../../../components/cards/QualificationCard"

describe("<QualificationCard />", () => {
  test("is rendered", () => {
    const data: object = {
      _id: "test_id",
      title: "test title",
    }
    const task: object = {
      qualification: 1,
    }
    const component = render(<QualificationCard data={data} task={task} />)
    component.getByText("View Task")
  })
  test("if not passed title", () => {
    const data: object = {
      _id: "test_id",
    }
    const task: object = {
      qualification: 1,
    }
    const component = render(<QualificationCard data={data} task={task} />)
    expect(component.getByTestId("qualificationcardtitle").textContent).toBe("")
  })
  test("is showing title", () => {
    const data: object = {
      _id: "test_id",
      title: "test title",
    }
    const task: object = {
      qualification: 1,
    }
    const component = render(<QualificationCard data={data} task={task} />)
    component.getByText("test title")
  })
  test("is not showing qualification if not have qualification", () => {
    const data: object = {
      _id: "test_id",
      title: "test title",
    }
    const task: object = {}
    const component = render(<QualificationCard data={data} task={task} />)
    component.getByText("Qualification:")
  })
  test("is showing qualification if this is >= 0", () => {
    const data: object = {
      _id: "test_id",
      title: "test title",
    }
    const task: object = {
      qualification: 1,
    }
    const component = render(<QualificationCard data={data} task={task} />)
    component.getByText("Qualification: 1")
  })
})
