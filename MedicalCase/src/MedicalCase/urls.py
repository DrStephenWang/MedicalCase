from django.conf.urls import patterns, include, url
from django.conf import settings


# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'MedicalCase.views.home', name='home'),
    # url(r'^MedicalCase/', include('MedicalCase.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    ('^front$', 'TCM.views.front'),
    ('^frontsearch$','TCM.views.frontsearch'),
    ('^frontresultlist$','TCM.views.frontresultlist'),
    ('^doctor$', 'TCM.views.doctorpage'),
    ('^doctorresultlist$', 'TCM.views.doctorresultlist'),
    ('^classifybrowse$', 'TCM.views.classifybrows'),
    ('^seniorsearch$', 'TCM.views.seniorsearch'),
    ('^dislist$', 'TCM.views.dislist'),
    ('^disclist$', 'TCM.views.disclist'),
    ('^casedetail$', 'TCM.views.casedetail'),
    ('^casedetailinfo$', 'TCM.views.casedetailinfo'),
    ('^graph$', 'TCM.views.graph'),
    ('^graphsearch$', 'TCM.views.graphsearch'),
    ('^graphresultlist$', 'TCM.views.graphresultlist'),
    ('^index$', 'TCM.views.index'),
       
    (r'^(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_URL}) 


)
