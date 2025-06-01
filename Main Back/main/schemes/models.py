from django.db import models

# Define the types of schemes and loan types
class Scheme(models.Model):
    TYPES = (
        ('Ct', 'Central'),
        ('St', 'State')
    )
    LOAN_TYPES = (
        ('re', 'Repayable'),
        ('gr', 'Grant')
    )
    
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=2, choices=TYPES)
    description = models.TextField()  # Changed from CharField to TextField for better description support
    beneficiaries = models.CharField(max_length=100)
    status = models.BooleanField(default=False)  # Indicates if the scheme is active
    image = models.ImageField(upload_to='scheme_images')
    region = models.CharField(max_length=50)
    loan_type = models.CharField(max_length=2, choices=LOAN_TYPES, default='re')

    # Adding additional fields for eligibility checks
    max_age = models.PositiveIntegerField(null=True, blank=True)  # Max age for eligibility
    min_age = models.PositiveIntegerField(null=True, blank=True)  # Min age for eligibility
    max_income = models.PositiveIntegerField(null=True, blank=True)  # Max income limit
    max_land_owned = models.FloatField(null=True, blank=True)  # Max land ownership limit
    requires_aadhar_link = models.BooleanField(default=True)  # Aadhar linking requirement
    requires_disability = models.BooleanField(default=False)  # Disability status requirement

    def __str__(self):
        return self.name


class EligibilityCriteria(models.Model):
    scheme = models.ForeignKey(Scheme, on_delete=models.CASCADE, related_name="criteria")
    criterion_key = models.CharField(max_length=100)  # e.g., "region", "caste", etc.
    criterion_value = models.CharField(max_length=100)  # e.g., "Rural", "OBC", etc.

    def __str__(self):
        return f"{self.scheme.name} - {self.criterion_key}: {self.criterion_value}"


class SchemeApplication(models.Model):
    applicant_name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    region = models.CharField(max_length=50)
    annual_income = models.PositiveIntegerField()
    disability = models.BooleanField(default=False)
    employment = models.CharField(max_length=20)
    unpaid_loans = models.BooleanField(default=False)
    land_ownership = models.BooleanField(default=False)
    land_owned = models.FloatField(default=0.0)
    caste = models.CharField(max_length=20)
    religion = models.CharField(max_length=20)
    aadhar_link = models.BooleanField(default=False)

    scheme = models.ForeignKey(Scheme, on_delete=models.CASCADE)
    is_eligible = models.BooleanField(default=False)  # Computed after validation
    validation_message = models.TextField(blank=True)

    def __str__(self):
        return f"{self.applicant_name} - {self.scheme.name}"

    def validate_eligibility(self):
        scheme = self.scheme

        # Age validation
        if scheme.min_age and self.age < scheme.min_age:
            self.is_eligible = False
            self.validation_message = f"Age is below the minimum required ({scheme.min_age})."
            return False

        if scheme.max_age and self.age > scheme.max_age:
            self.is_eligible = False
            self.validation_message = f"Age exceeds the maximum allowed ({scheme.max_age})."
            return False

        # Income validation
        if scheme.max_income and self.annual_income > scheme.max_income:
            self.is_eligible = False
            self.validation_message = f"Annual income exceeds the limit ({scheme.max_income})."
            return False

        # Land ownership validation
        if scheme.max_land_owned and self.land_ownership and self.land_owned > scheme.max_land_owned:
            self.is_eligible = False
            self.validation_message = f"Land owned exceeds the permissible limit ({scheme.max_land_owned} acres)."
            return False

        # Aadhar link validation
        if scheme.requires_aadhar_link and not self.aadhar_link:
            self.is_eligible = False
            self.validation_message = "Aadhar is not linked to the bank."
            return False

        # Disability requirement validation
        if scheme.requires_disability and not self.disability:
            self.is_eligible = False
            self.validation_message = "Disability is required for this scheme."
            return False

        # Additional criteria validation (based on Scheme's criteria)
        criteria = scheme.criteria.all()
        for criterion in criteria:
            value = getattr(self, criterion.criterion_key, None)
            if value != criterion.criterion_value:
                self.is_eligible = False
                self.validation_message = f"Does not meet the criterion: {criterion.criterion_key} = {criterion.criterion_value}."
                return False

        # If all checks pass
        self.is_eligible = True
        self.validation_message = "Application is eligible."
        return True
