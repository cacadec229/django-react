from django.shortcuts import render , redirect
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from .forms import InstavetsSermepaPaymentForm
from .models import Booking, Order, Customer, Pet
from datetime import datetime
#Payment Imports
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.conf import settings
from django.core.urlresolvers import reverse
from sermepa.signals import payment_was_successful, payment_was_error, signature_error
from sermepa.models import SermepaIdTPV

#JSON
from django.http import JsonResponse

# Create your views here.
@csrf_exempt
def CheckoutPage(request):
    if request.method == "POST":
        print request.POST
        data = request.POST
        #1. Get data
        step = data.__getitem__('step')
        print step
        if step == '1':
            print 'Step 1: Creating the customer..'
            #Customer
            customer = Customer()
            customer.first_name = data.__getitem__('data[first_name]')
            customer.last_name = data.__getitem__('data[second_name]')
            customer.city = data.__getitem__('data[city]')
            customer.adress = data.__getitem__('data[adress]')
            customer.phone_number = data.__getitem__('data[phone_number]')
            customer.save()
            print 'Step 2: Creating the booking..'
            #Booking
            booking = Booking()
            booking.city = data.__getitem__('data[city]')
            booking.adress = data.__getitem__('data[adress]')
            booking.customer = customer
            booking_date = datetime.strptime(data.__getitem__('booking_date_django'), "%a, %d %b %Y %H:%M:%S %Z")
            booking.date_booking = booking_date
            booking.save()
            #Saving the order
            print 'Creating the order'
            order = Order()
            order.status = 'pendiente'
            order.booking = booking
            order.customer = customer
            order.ref_code = SermepaIdTPV.objects.new_idtpv()
            order.save()
            #Generating Response
            request.session['customer_id'] = customer.pk
            request.session['order_id'] = order.pk
            request.session['booking_id'] = booking.pk
            response = HttpResponse('Cookie Set')
            #Writting the cookies
            return response
        elif step == '2':
            pet = Pet()
            customer_id = request.session.get('customer_id')
            customer = get_object_or_404(Customer, pk=customer_id)
            pet.name = data.__getitem__('data[pet_name]')
            pet.gender = data.__getitem__('data[pet_gender]')
            pet.species = data.__getitem__('data[pet_species]')
            pet.breed = data.__getitem__('data[pet_breed]')
            pet.age = data.__getitem__('data[pet_birthday]')
            pet.customer = customer
            pet.save()
            print 'Pet Saved ...'
            #Redifining Context with the New Data

    return render(request, "booking_app/checkout.html")


@csrf_exempt
def PaymentPage(request):
    amount = int(40 * 100) # El precio es en centimos de euro
    trans_type = '0'
    #Getting Order Info
    customer_id = request.session.get('customer_id')
    booking_id = request.session.get('booking_id')
    order_id = request.session.get('order_id')
    customer = get_object_or_404(Customer, pk=customer_id)
    booking = get_object_or_404(Booking, pk=booking_id)
    order = get_object_or_404(Order, pk=order_id)
    pet = get_object_or_404(Pet,customer=customer.id )
    print pet
    merchant_parameters = {
        "Ds_Merchant_Titular": customer.first_name + customer.last_name ,
        "Ds_Merchant_MerchantData": order.id, # id del Pedido o Carrito, para identificarlo en el mensaje de vuelta
        "Ds_Merchant_MerchantName": 'Instavets',
        "Ds_Merchant_ProductDescription": 'Consulta a Domicilio',
        "Ds_Merchant_Amount": amount,
        "Ds_Merchant_Terminal": settings.SERMEPA_TERMINAL,
        "Ds_Merchant_MerchantCode": settings.SERMEPA_MERCHANT_CODE,
        "Ds_Merchant_Currency": settings.SERMEPA_CURRENCY,
        "Ds_Merchant_MerchantURL": "http:/%s%s" % (settings.SERMEPA_SITE_DOMAIN, reverse('sermepa_ipn')),
        "Ds_Merchant_UrlOK": "http://%s%s" % (settings.SERMEPA_SITE_DOMAIN, reverse('payment-confirm')),
        "Ds_Merchant_UrlKO": "http://%s%s" % (settings.SERMEPA_SITE_DOMAIN, reverse('payment-confirm')),
    }
    print 'order:'
    print order
    if trans_type == '0': #Compra puntual
        merchant_parameters.update({
            "Ds_Merchant_Order": order.ref_code,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == 'L': #Compra recurrente por fichero. Cobro inicial
        merchant_parameters.update({
            "Ds_Merchant_Order": order.ref_code,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == 'M': #Compra recurrente por fichero. Cobros sucesivos
        # order = suscripcion.idtpv #Primer idtpv, 10 digitos
        order.ref_code = ''
        merchant_parameters.update({
            "Ds_Merchant_Order": order.ref_code,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == '0': #Compra recurrente por Referencia. Cobro inicial
        order.ref_code = 'REQUIRED'
        merchant_parameters.update({
            "Ds_Merchant_Order": order.ref_code,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == '0': #Compra recurrente por Referencia. Cobros sucesivos
        # order = suscripcion.idreferencia #Primer idtpv, 10 digitos
        order.ref_code = ''
        merchant_parameters.update({
            "Ds_Merchant_Order": order.ref_code,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == '3': #Devolucion
        # order = suscripcion.idreferencia #Primer idtpv, 10 digitos
        order = ''
        merchant_parameters.update({
            "Ds_Merchant_Order": order.ref_code,
            "Ds_Merchant_TransactionType": trans_type,
            #"Ds_Merchant_AuthorisationCode": pedido.Ds_AuthorisationCode, #Este valor sale
            "Ds_Merchant_AuthorisationCode": '',
            # de la SermepaResponse obtenida del cobro que se quiere devolver.
        })

    form = InstavetsSermepaPaymentForm(merchant_parameters=merchant_parameters)
    context = {
        'customer':customer,
        'booking':booking,
        'order':order,
        'pet': pet,
        'form': form,
        'debug': settings.DEBUG,
    }

    return HttpResponse(render_to_response('booking_app/payment.html', context))

#Payment Confirm Page
def PaymentConfirmPage(request):
    customer_id = request.session.get('customer_id')
    booking_id = request.session.get('booking_id')
    order_id = request.session.get('order_id')
    customer = get_object_or_404(Customer, pk=customer_id)
    booking = get_object_or_404(Booking, pk=booking_id)
    order = get_object_or_404(Order, pk=order_id)
    context = {
        'customer': customer,
        'order': order,
        'booking': booking,
    }
    return render(request, 'booking_app/payment_confirm.html', context )

#----------------------------Cookies--------------------------------------------
#Test If Cookies can be set on user browser
#Returns True of False
def CookieTestSet(request):
    if request.method == "POST":
        request.session.set.test.cookie()
        cookies_set = {'CookieSet':True}
        return JsonResponse(cookies_set)

#Returns True if coookies worked and false othewise
def CookieTestVerify(request):
    if request.method == "POST":
        cookie_worked = {'CookieWorked': request.session.test_cookie_worked()}
        return JsonResponse(cookie_worked)

#Check if user already made an order and autocompletes