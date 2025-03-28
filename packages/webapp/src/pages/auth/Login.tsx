import { IconLanguage } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import { RedirectUriLink } from '@/components'
import { Dropdown, Form, Input, Menus } from '@/components/ui'
import { APP_DISABLE_REGISTRATION, DISABLE_LOGIN_WITH_EMAIL, LOCALES_OPTIONS } from '@/consts'
import i18n from '@/locales'
import { AuthService } from '@/service'
import { useQueryURL, useRouter } from '@/utils'

import { ThirdPartyLogin } from './views/ThirdPartyLogin'

const Login = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const nextURL = useQueryURL('/')

  async function handleFinish(values: any) {
    await AuthService.login(values.email, values.password)
    router.redirect(nextURL)
  }

  return (
    <div>
      <div className="flex justify-end px-4 pt-4">
        <Dropdown
          placement="bottom-end"
          overlay={
            <Menus>
              {LOCALES_OPTIONS.map(row => (
                <Menus.Item
                  key={row.value}
                  label={row.label}
                  isChecked={i18n.language === row.value}
                  onClick={() => i18n.changeLanguage(row.value)}
                />
              ))}
            </Menus>
          }
        >
          <button className="flex items-center text-sm text-slate-500 hover:text-slate-700">
            <IconLanguage className="mr-1" size={18} />
            {t('other.language')}
          </button>
        </Dropdown>
      </div>
      <div>
        <h1 className="mt-6 text-center text-3xl font-bold text-slate-900">{t('login.signIn')}</h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          {t('login.logIn')} {''}
          {!APP_DISABLE_REGISTRATION && (
            <>
              {t('login.or')} {''}
              <RedirectUriLink
                href="/sign-up"
                className="font-medium text-blue-700 hover:text-blue-800"
              >
                {t('login.startFree')}
              </RedirectUriLink>
            </>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <ThirdPartyLogin
            headline={t('login.signWith')}
            subHeadline={!DISABLE_LOGIN_WITH_EMAIL ? t('login.continueWith') : ''}
          />
          {!DISABLE_LOGIN_WITH_EMAIL && (
            <Form.Custom
              submitText={t('login.button')}
              submitOptions={{
                type: 'primary',
                block: true
              }}
              request={handleFinish}
            >
              <Form.Item
                name="email"
                label={t('login.Email')}
                rules={[{ type: 'email', required: true, message: t('login.EmailRequired') }]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                name="password"
                label={
                  <div className="flex items-center justify-between">
                    <span>{t('login.Password')}</span>
                    <RedirectUriLink
                      href="/forgot-password"
                      className="text-sm font-medium text-blue-700 hover:text-blue-800"
                    >
                      {t('login.forgotPassword')}
                    </RedirectUriLink>
                  </div>
                }
                rules={[{ required: true, message: t('login.PasswordRequired') }]}
              >
                <Input.Password />
              </Form.Item>
            </Form.Custom>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
