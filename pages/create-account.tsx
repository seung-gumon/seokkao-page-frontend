import { NextPage } from "next";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import {EMAIL_PATTERN, PHONE_PATTERN} from "../public/constants";
import { ErrorMessage } from "@hookform/error-message";
import { ILoginForm } from "./login";
import {gql, useMutation} from "@apollo/client";
import {UserRole} from "../__generated__/globalTypes";
import {createAccount, createAccountVariables} from "../__generated__/createAccount";
import { useRouter } from 'next/router'




const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`



interface ICreateAccount {}

interface ICreateAccountForm extends ILoginForm {
  name: string;
  phoneNumber: string;
  role: UserRole;
}

const CreateAccount: NextPage<ICreateAccount> = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      role: UserRole.User
    }
  });

  const router = useRouter();

  const [createAccountMutation , loading] = useMutation<createAccount, createAccountVariables>(CREATE_ACCOUNT_MUTATION, {
    onCompleted: data => {
      const {createAccount: {ok}} = data;
      if (ok) {
        alert("계정이 성공적으로 생성 되었습니다");
        return router.push("/login");
      } else {
        return alert("계정 생성을 실패 하였습니다. 새로고침후 다시 시도해주세요");
      }
    }
  })



  const onSubmit = async () => {
    const {email, password, role, name, phoneNumber} = getValues();

    await createAccountMutation({
      variables : {
        createAccountInput : {
          email,
          password,
          name,
          role,
          phoneNumber,
          coin : 10
        }
      }
    })
  };

  return (
    <div
      className={"w-full mx-auto flex flex-col items-center mb-3 lg:w-6/12 bg-white pt-6"}
      style={{ maxWidth: "1150px" }}
    >
      <Head>
        <title>Create Account | 석카오페이지</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Link href={"/"}>
        <a>
          <img
            className={"cursor-pointer"}
            src={"/logo-kakaopage.svg"}
            alt={"kakaoPage"}
            width={"130px"}
            height={"29px"}
          />
        </a>
      </Link>
      <div className="w-full flex flex-col bg-cover bg-center justify-content bg-white p-6 rounded pt-8 pb-8">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("name", {
                required: "이름을 기입해주세요",
              })}
              className="bg-transparent border-b m-auto block border-gray-500 w-full mb-2 text-gray-500 py-2 px-1 focus:outline-none text-sm"
              type="text"
              name={"name"}
              placeholder="이름을 기입해주세요"
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ messages }) => {
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p className={"errorMessage text-sm"} key={type}>
                        {message}
                      </p>
                    ))
                  : null;
              }}
            />
            <input
              {...register("phoneNumber", {
                required: "전화번호를호 기입해주세요",
                pattern : {
                  value:PHONE_PATTERN,
                  message : "패턴에 맞게 기입해주세요"
                }
              })}
              className="bg-transparent border-b m-auto block border-gray-500 w-full mb-2 text-gray-500 py-2 px-1 focus:outline-none text-sm"
              type="number"
              name={"phoneNumber"}
              placeholder="전화번호를 기입해주세요 (ex:010-1234-5678)"
            />
            <ErrorMessage
              errors={errors}
              name="phoneNumber"
              render={({ messages }) => {
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p className={"errorMessage text-sm"} key={type}>
                        {message}
                      </p>
                    ))
                  : null;
              }}
            />
            <input
              {...register("email", {
                required: "이메일을 적어주세요",
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "이메일을 적어주세요",
                },
              })}
              className="bg-transparent border-b m-auto block border-gray-500 w-full mb-2 text-gray-500 py-2 px-1 focus:outline-none text-sm"
              type="text"
              name={"email"}
              placeholder="이메일을 기입해주세요"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) => {
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p className={"errorMessage text-sm"} key={type}>
                        {message}
                      </p>
                    ))
                  : null;
              }}
            />

            <input
              {...register("password", {
                required: "비밀번호를 적어주세요",
              })}
              className="bg-transparent border-b m-auto block border-gray-500 w-full mb-2 text-gray-500 py-2 px-1 focus:outline-none text-sm"
              type="password"
              name={"password"}
              placeholder="비밀번호를 기입해주세요"
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ messages }) => {
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p className={"errorMessage text-sm"} key={type}>
                        {message}
                      </p>
                    ))
                  : null;
              }}
            />
            <select
                {...register("role", {required: "신분을 선택해주세요",})}
                className={'bg-transparent border-b m-auto block border-gray-500 focus:outline-none mb-2 text-gray-500 py-2 px-1 mt-1 block w-full'}
                name={'role'}>
              {Object.keys(UserRole).map((role, index) => <option key={index}>{role}</option>)}
            </select>
            <ErrorMessage
                errors={errors}
                name="role"
                render={({ messages }) => {
                  return messages
                      ? Object.entries(messages).map(([type, message]) => (
                          <p className={"errorMessage text-sm"} key={type}>
                            {message}
                          </p>
                      ))
                      : null;
                }}
            />
            <input
              className={
                "shadow-lg pt-3 pb-3 mt-2 w-full cursor-pointer transition-colors rounded-full " + (isValid ? ' text-white bg-amber-400 ' : ' text-blueGray-300 bg-teal-500')
              }
              type="submit"
              value={!loading.loading ? "회원가입 완료!" : "Loading..."}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
