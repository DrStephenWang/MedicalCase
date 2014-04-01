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
    ('^frontsearch$','TCM.views.frontSearch'),
    ('^frontresultlist$','TCM.views.frontResultList'),
    ('^doctor$', 'TCM.views.doctorPage'),
    ('^doctorresultlist$', 'TCM.views.doctorResultList'),
    ('^classifybrowse$', 'TCM.views.classifyBrows'),
    ('^seniorsearch$', 'TCM.views.seniorSearch'),
    ('^dislist$', 'TCM.views.disList'),
    ('^disclist$', 'TCM.views.discList'),
    ('^therlist', 'TCM.views.therList'),
    ('^casedetail$', 'TCM.views.caseDetail'),
    ('^casedetailinfo$', 'TCM.views.caseDetailInfo'),
    ('^graph$', 'TCM.views.graph'),
    ('^graphsearch$', 'TCM.views.graphSearch'),
    ('^graphresultlist$', 'TCM.views.graphResultList3'),
    ('^index$', 'TCM.views.index'),
    ('^error$', 'TCM.views.error'),
    ('^test$', 'TCM.views.test'),
    ('^test2$', 'TCM.views.test2'),
    
    (r'^(?P<path>.*)$', 'TCM.views.chain')  
    #(r'^(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_URL}) 


)
