import { useForm } from "react-hook-form";
import { styled } from "styled-components";

const ErrorM = styled.span`
  color: red;
`;

interface IFormData {
  errors: {
    email: {
      message: string;
    }; //error message type
  };
  email: string;
  id: string;
  password1: string;
  password2: string;
  extraError?: string;
}

const ToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IFormData>();

  const onValid = (data: IFormData) => {
    if (data.password1 !== data.password2) {
      setError(
        "password2",
        { message: "Password different" },
        { shouldFocus: true }
      );
    }
    setValue("id", "");
    setValue("email", "");
    setValue("password1", "");
    setValue("password2", "");

    // setError("extraError", { message: "server Offline." });
  };

  console.log(errors);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}>
        <input
          {...register("id", {
            required: "error message",
            validate: {
              //특정 문자 제한
              noJble: (value) =>
                value.includes("jble") ? "no jble nickname" : true,
              noAdmin: (value) =>
                value.includes("admin") ? "no admin ID" : true,
            },
            minLength: {
              value: 2,
              message: "id is short", //error message
            },
          })}
          placeholder="ID"
        />
        <ErrorM>{errors?.id?.message}</ErrorM>
        <input
          {...register("email", {
            required: "error message",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/, //정규식 사용}
              message: "only naver email used",
            },
          })}
          placeholder="Email"
        />
        <ErrorM>{errors?.email?.message}</ErrorM>
        <input
          {...register("password1", {
            required: "error message",
          })}
          placeholder="Password"
        />
        <ErrorM>{errors?.password1?.message}</ErrorM>
        <input
          {...register("password2", {
            required: "error message",
          })}
          placeholder="Password Confirm"
        />
        <ErrorM>{errors?.password2?.message}</ErrorM>
        <button>Add</button>
        <ErrorM>{errors?.extraError?.message}</ErrorM>
      </form>
    </div>
  );
};

export default ToDoList;
