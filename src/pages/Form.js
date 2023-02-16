import { useState } from "react";

const Form = () => {
  const modules = [
    {
      id: 1,
      title: "Entreprise",
      is_active: true,
      elements: [
        {
          id: 1,
          type: "section",
          title: "Nom de l'entreprise",
          is_active: true,
          module_id: 1,
          questions: [
            {
              id: 1,
              type: "question",
              label: "Label",
              name: "name_1",
              inputType: "text",
              inputValue: "bla ",
              is_active: true,
              module_id: 1,
              section_id: 1,
            },
            {
              id: 3,
              type: "question",
              label: "Question 2",
              name: "name_2",
              inputType: "text",
              inputValue: "bla bla 2",
              is_active: true,
              module_id: 1,
              section_id: 1,
            },
          ],
        },
        {
          id: 2,
          type: "question",
          label: "Décriver l'histoire de votre entreprise",
          name: "name_3",
          inputType: "text",
          inputValue: "bla bla bla bla bla bla",
          is_active: true,
          module_id: 1,
          section_id: 1,
        },
        {
          id: 3,
          type: "section",
          title: "Nom de l'entreprise",
          is_active: true,
          module_id: 1,
          questions: [
            {
              id: 4,
              type: "question",
              label: "Label",
              name: "name_1",
              inputType: "text",
              inputValue: "bla ",
              is_active: true,
              module_id: 1,
              section_id: 3,
            },
            {
              id: 5,
              type: "question",
              label: "Question 2",
              name: "name_1",
              inputType: "text",
              inputValue: "bla bla 2",
              is_active: true,
              module_id: 1,
              section_id: 3,
            },
          ],
        },
      ],
    },
  ];

  const [inputs, setInputs] = useState(modules);

  const handleChangeNoSection = (e, elementIndex) => {
    const updatedModules = [...inputs];
    updatedModules[0].elements[elementIndex].inputValue = e.target.value;

    setInputs(updatedModules);
  };

  const handleChangeSection = (e, elementIndex, questionIndex) => {
    const updatedModules = [...inputs];
    updatedModules[0].elements[elementIndex].questions[questionIndex].inputValue = e.target.value;

    setInputs(updatedModules);
  };


  return (
    <form>
        <section className="moduleContainer">
          <div className="moduleContainer__left">
            <h2>{inputs[0].title}</h2>
          </div>
          <div className="moduleContainer__right">
            {inputs[0]?.elements?.map((element, elementIndex) => {
              return (
                <div className="moduleContainer__right--content" key={element.id}>
                  {element?.type === "section" ? (
                    <div key={element.id} className="sectionContainer">
                      <div className="sectionContainer__left">
                        {/* <h2>Section Title</h2> */}
                        <h2>{element.title}</h2>
                      </div>
                      <div className="sectionContainer__right">
                        {element?.questions?.map((question, questionIndex) => {
                          return (
                            <div
                              key={question.id}
                              className="questionContainer"
                            >
                              <label htmlFor={question.id} className="questionContainer__label">
                                {question.label}
                              </label>
                              <input
                                id={question.id}
                                name={question.name}
                                className="questionContainer__input"
                                type={question.inputType}
                                value={question.inputValue}
                                onChange={(e) => handleChangeSection(e, elementIndex, questionIndex)}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="questionContainer">
                      <label htmlFor={element.id} className="questionContainer__label">
                        {element.label}
                      </label>
                      <input
                        id={element.id}
                        name={element.name}
                        className="questionContainer__input"
                        type={element.inputType}
                        value={element.inputValue}
                        onChange={(e) => handleChangeNoSection(e, elementIndex)}
                      />
                    </div>
                  )}
                </div>
              );

              // <div className="sectionContainer">
              //   <div className="sectionContainer__left">
              //     <h2>Section Title</h2>
              //   </div>
              //   <div className="sectionContainer__right">
              //     <div className="questionContainer">
              //       <label className="questionContainer__label">Histoire</label>
              //       <input
              //         className="questionContainer__input"
              //         type="text"
              //         value="reponse"
              //       />
              //     </div>
              //   </div>
              // </div>
            })}
          </div>
        </section>
      </form>
  )
}

export default Form