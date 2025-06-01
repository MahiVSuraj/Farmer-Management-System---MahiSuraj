from django.contrib import admin
from .models import Scheme, EligibilityCriteria, SchemeApplication

# Admin for Scheme Model
@admin.register(Scheme)
class SchemeAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'status', 'region', 'loan_type', 'max_age', 'max_income', 'max_land_owned')
    list_filter = ('type', 'status', 'loan_type')
    search_fields = ('name', 'description', 'region')

# Admin for EligibilityCriteria Model
@admin.register(EligibilityCriteria)
class EligibilityCriteriaAdmin(admin.ModelAdmin):
    list_display = ('scheme', 'criterion_key', 'criterion_value')
    list_filter = ('scheme',)
    search_fields = ('scheme__name', 'criterion_key', 'criterion_value')

# Admin for SchemeApplication Model
@admin.register(SchemeApplication)
class SchemeApplicationAdmin(admin.ModelAdmin):
    list_display = ('applicant_name', 'scheme', 'is_eligible', 'validation_message', 'age', 'annual_income')
    list_filter = ('scheme', 'is_eligible')
    search_fields = ('applicant_name', 'scheme__name')

