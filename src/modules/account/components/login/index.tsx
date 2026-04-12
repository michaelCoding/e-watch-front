"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { login } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

function SignInButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 text-white rounded-full font-semibold tracking-wide hover:opacity-90 transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-60"
      style={{ background: "linear-gradient(135deg, #006875 0%, #00e5ff 100%)" }}
      data-testid="sign-in-button"
    >
      {pending ? "Signing in…" : "Sign In"} <span aria-hidden="true">→</span>
    </button>
  )
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <main
      className="flex items-center justify-center relative px-6 py-16 min-h-[calc(100vh-72px)] bg-surface"
      data-testid="login-page"
    >
      {/* Background wood-grain texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542621334-a254cf47733d?w=1600&q=60"
          alt=""
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white p-8 medium:p-12 rounded-xl shadow-[0px_20px_40px_rgba(28,28,25,0.04)] border border-outline-variant/10">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl text-primary mb-2">Welcome Back</h1>
            <p className="text-on-surface-variant text-sm tracking-tight">
              Enter the quiet space of slow-crafted living.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" action={formAction}>
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-xs font-bold tracking-wider text-on-surface-variant/80 uppercase"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-surface-container-high border-none rounded-lg focus:ring-0 focus:bg-white transition-all duration-300 placeholder:text-[#d5c3b8] text-on-surface outline-none"
                data-testid="email-input"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold tracking-wider text-on-surface-variant/80 uppercase"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-primary/70 hover:text-primary transition-colors"
                >
                  Forgot?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-surface-container-high border-none rounded-lg focus:ring-0 focus:bg-white transition-all duration-300 placeholder:text-[#d5c3b8] text-on-surface outline-none"
                data-testid="password-input"
              />
            </div>

            {/* Error */}
            {message && (
              <p className="text-sm text-red-600">{message}</p>
            )}

            <SignInButton />
          </form>

          {/* Register link */}
          <div className="mt-8 pt-8 border-t border-surface-container-low text-center">
            <p className="text-on-surface-variant text-sm">New to the atelier?</p>
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className="inline-block mt-2 text-primary font-semibold border-b-2 border-[#f4bb92] pb-0.5 hover:border-primary transition-all"
              data-testid="register-button"
            >
              Create an Account
            </button>
          </div>
        </div>

        {/* Quote decoration */}
        <div className="mt-10 flex items-center gap-5 opacity-80">
          <div className="h-px flex-grow bg-outline-variant/30" />
          <span className="font-bold italic text-primary/60 text-sm whitespace-nowrap">
            Crafted with Intention
          </span>
          <div className="h-px flex-grow bg-outline-variant/30" />
        </div>
      </div>
    </main>
  )
}

export default Login
