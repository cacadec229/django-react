"""
Django settings for instavets project.

Generated by 'django-admin startproject' using Django 1.9.6.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'dv4$wf-a)byi_yrb6$zigc+1y5y9scnu+vj$ng5vq3b3qk*nhd'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost:8000']


# Application definition

INSTALLED_APPS = [
    'jet.dashboard',
    'sermepa',
    'jet',
    'django.contrib.sites',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'bootstrapform',
    'rest_framework',
    'ckeditor',
    'products_app',
    'contact_app',
    'services_app',
    'debug_toolbar',
    'app_booking',
    #All Auth
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
     # ... include the providers you want to enable:
    #'allauth.socialaccount.providers.facebook',
]

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'instavets.urls'

# Email settings:
# In this case they were set as environment variables, change to will.
EMAIL_HOST = 'Instavets'
EMAIL_PORT = 25
EMAIL_HOST_USER = 'root'
EMAIL_HOST_PASSWORD = '1nstav3ts_01'
EMAIL_USE_TLS = True

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.template.context_processors.media',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'services_app.context_processors.services_processor',
            ],
        },
    },
]

WSGI_APPLICATION = 'instavets.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

#Rest Api Setings
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}

# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'es'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR),"static_collected", "static_folder")

STATICFILES_DIRS = [
    os.path.join(os.path.dirname(BASE_DIR), "static_files"),
]

MEDIA_ROOT = os.path.join(os.path.dirname(BASE_DIR),"media_files")

MEDIA_URL = '/media/'

#Sermepa Settings
SERMEPA_URL_PRO = 'https://sis.redsys.es/sis/realizarPago'
SERMEPA_URL_TEST = 'https://sis-t.redsys.es:25443/sis/realizarPago'
SERMEPA_MERCHANT_CODE = '341322154' #comercio de test
SERMEPA_TERMINAL = '001'
SERMEPA_BUTTON_IMG = '/site_media/_img/targets.jpg'
SERMEPA_CURRENCY = '978' #Euros
SERMEPA_SIGNATURE_VERSION = 'HMAC_SHA256_V1' # This value is fixed
SERMEPA_SECRET_KEY = 'sq7HjrUOBfKmC576ILgskD5srU870gJ7'     # Your Redsys Secret Key
SERMEPA_BUTTON_TEXT = 'Confirmar y Pagar'
# CKEDITOR SETTINGS

SITE_ID = 1;

#All-Auth
AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
)

#All Auth Configurations:

#ACCOUNT_SIGNUP_FORM_CLASS = 'booking_app.forms.SignupForm'

#ACCOUNT_FORMS = {
#    'login': 'booking_app.forms.SignupForm',
#}

#HEROKU
# Simplified static file serving.
# https://warehouse.python.org/project/whitenoise/

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'


U_LOGFILE_NAME = os.path.join(os.path.dirname(BASE_DIR), 'logs/development.log')
U_LOGFILE_SIZE = 1 * 1024 * 1024
U_LOGFILE_COUNT = 2
U_LOGFILE_APP1 = 'instavets'
U_LOGFILE_APP2 = 'sermepa'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format' : "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            #'datefmt' : "%d/%b/%Y %H:%M:%S"
        },
    },
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        },
        'logfile': {
            'level':'DEBUG',
            'class':'logging.handlers.RotatingFileHandler',
            'filename': U_LOGFILE_NAME,
            'maxBytes': U_LOGFILE_SIZE,
            'backupCount': U_LOGFILE_COUNT,
            'formatter': 'standard',
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
        U_LOGFILE_APP1: {
            'handlers': ['logfile'],
            'level': 'DEBUG',
            'propagate': True,
        },
        U_LOGFILE_APP2: {
            'handlers': ['logfile'],
            'level': 'DEBUG',
            'propagate': True,
        },
    }
}

# CKEDITOR settings

CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'full',
        'height': 600,
        'width': 1140,
    },
}
