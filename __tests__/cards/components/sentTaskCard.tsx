import { render } from "@testing-library/react"
import SentTaskCard from "../../../components/cards/SentTaskCard"

describe("<SentTaskCard />", () => {
  test("is rendered", () => {
    const data: object = {
      qualification: 1,
      student: {
        personalData: {
          firstName: "test first name",
          lastName: "test las name",
        },
      },
    }
    const task: object = {
      _id: "test id",
    }
    const component = render(<SentTaskCard data={data} task={task} />)
    component.getByText("View Task")
  })

  test("is showing student name", () => {
    const data = {
      qualification: 1,
      student: {
        personalData: {
          firstName: "test first name",
          lastName: "test las name",
        },
      },
    }
    const task = {
      _id: "test id",
    }
    const component = render(<SentTaskCard data={data} task={task} />)
    component.getByText(
      `${data.student.personalData.firstName} ${data.student.personalData.lastName}`,
    )
  })
  test("is not showing qualification if not have qualification", () => {
    const data = {
      student: {
        personalData: {
          firstName: "test first name",
          lastName: "test las name",
        },
      },
    }
    const task = {
      _id: "test id",
    }
    const component = render(<SentTaskCard data={data} task={task} />)
    component.getByText("Qualification:")
  })
  test("is showing qualification if this is >= 0", () => {
    const data = {
      qualification: 1,
      student: {
        personalData: {
          firstName: "test first name",
          lastName: "test las name",
        },
      },
    }
    const task = {
      _id: "test id",
    }
    const component = render(<SentTaskCard data={data} task={task} />)
    component.getByText("Qualification: 1")
  })
})
