import pytest
from pydantic import ValidationError
from server import ContactData


def valid_data():
    return {
        "email": "visitor@example.com",
        "name": "John Doe",
        "message": "Hello, I liked your portfolio!",
        "customRole": "",
        "projectType": "Software Engineer",
        "turnstile_token": "test-token",
    }


def test_valid_contact_data():
    data = ContactData(**valid_data())

    assert data.email == "visitor@example.com"
    assert data.name == "John Doe"
    assert data.projectType == "Software Engineer"

def test_whitespace_only_name_rejected():                                                                                         
        payload = valid_data()                                                                                                        
        payload["name"] = "   "                                                                                                       
        with pytest.raises(ValidationError):                                                                                          
            ContactData(**payload)

@pytest.mark.parametrize("role", [                                                                                                
    "Machine Learning",                                                                                                           
    "Software Engineer",                                                                                                          
    "Data Engineering",                                                                                                           
    "Consultation",                                                                                                               
])                                                                                                                                
def test_all_standard_project_types(role):                                                                                        
    payload = valid_data()                                                                                                        
    payload["projectType"] = role                                                                                                 
    data = ContactData(**payload)                                                                                                 
    assert data.projectType == role 

def test_whitespace_only_message_rejected():                                                                                      
        payload = valid_data()                                                                                                        
        payload["message"] = "   \n\t  "                                                                                              
        with pytest.raises(ValidationError):                                                                                          
            ContactData(**payload)

def test_empty_name_rejected():
    payload = valid_data()
    payload["name"] = ''
    
    with pytest.raises(ValidationError):
        ContactData(**payload)
        
def test_invalid_email_rejected():
    payload = valid_data()
    payload['email'] = "not-an-mail=id"
    
    with pytest.raises(ValidationError):
        ContactData(**payload)

def test_empty_messages_rejected():
    payload = valid_data()
    payload["message"] = ""
    
    with pytest.raises(ValidationError):
        ContactData(**payload)

def test_msg_over_5000_char_rejected():
    payload = valid_data()
    payload["message"] = "a" * 50001
    
    with pytest.raises(ValidationError):
        ContactData(**payload)
    
def test_invalid_project_type_rejected():
    payload = valid_data()
    payload["projectType"] = "Random Job"
    
    with pytest.raises(ValidationError):
        ContactData(**payload)

def test_other_need_custom_role():
    payload = valid_data()
    payload["projectType"] = "Other"
    payload["customRole"] = ""
    
    with pytest.raises(ValidationError):
        ContactData(**payload)
        
def test_other_with_custom_role_is_valid():
    payload = valid_data()
    payload["projectType"] = "Other"
    payload["customRole"] = "AI Consultant"

    data = ContactData(**payload)

    assert data.customRole == "AI Consultant"


def test_whitespace_only_custom_role_with_other_rejected():                                                                       
    payload = valid_data()                                                                                                        
    payload["projectType"] = "Other"                                                                                              
    payload["customRole"] = "     "                                                                                               
    with pytest.raises(ValidationError):                                                                                          
        ContactData(**payload)
  
def test_missing_turnstile_token_rejected():
    payload = valid_data()
    del payload["turnstile_token"]
    with pytest.raises(ValidationError):
        ContactData(**payload) 



