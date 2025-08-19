import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col gap-4 items-center justify-between">
      <div className="flex flex-col gap-4 mt-4 items-center">
        <Link href={`/`}>
          <h1 className="text-2xl">ECOCart.in</h1>
        </Link>
        <form className="border gap-3 p-2 rounded flex flex-col" >
          <h2 className="font-medium">Sign in or create account</h2>
          <div className="flex flex-col">
            <label htmlFor="" className="font font-bold">
              Enter email
            </label>
            <input type="text" className="border p-1 rounded" name="email"/>
            <label htmlFor="" className="font font-bold">
              Enter Password
            </label>
            <input type="password" className="border p-1 rounded" name="password"/>
          </div>
          <button className="bg-amber-300 rounded-2xl p-1">Continue</button>
          <p className="text-sm flex flex-wrap border-b-1">
            By continuing, you agree to ECOCart's
            <span>Conditions of Use</span> and
            <span>Privacy Notice.</span>
          </p>
          <div className="flex flex-col">
            <span className="font-semibold">Buying for work?</span>
            <span className="opacity-70">Create a free business account</span>
          </div>
        </form>
      </div>
      <footer>
        <p>
          <span>Condition of Use</span>
          <span>Privacy Notice</span>
          <span>Help</span>
        </p>
        <p>&#169 2025-present,ECOCart.com,Inc. or its affiliates </p>
      </footer>
    </div>
  );
}
