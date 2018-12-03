<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LetterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {   
        $rules = [
            'letterID.*' => 'required|unique:batch,batchID|size:5',                  
            'senderPoBox.*' => 'required|string|max:15',
            'receiverPoBox.*'  => 'required|string|max:15',
            'isDelivered.*' => 'required|numeric|size:1',
            'pickupDate.*' => 'required|date',
            'pickupTime.*'  => 'required|string|max:5',              
            'batchID.*' => 'required|size:5',
            'location.*' => 'required|string|size:15',
            'phoneNumber.*' => 'required|numeric|max:15',
            'receivedBy.*' => 'required|string|max:15',
        ];               
        return $rules;
    }
    /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {   
        $messages= [
            'letterID.*.required' => 'LetterID is required',
            'letterID.*.unique' => 'LetterID is already entered',
            'letterID.*.required' => 'LetterID should be of 5 characters',
            'senderPoBox.*.required' => 'Sender P.O Box is required',            
            'receiverPoBox.*.required' => 'Receiver P.O Box is required',
            'isDelivered.*.required' => 'Is Delivered is required',
            'pickupDate.*.required' => 'The pick up date is required',
            'pickupDate.*.date' => 'Enter correct date format',
            'pickupTime.*.required' => 'The pick up time is required',
            'batchID.*.required' => 'The batchID is required',
            'location.*.required' => 'The Location is required',
            'phoneNumber.*.required' => 'The Phone Number  is required',
            'receivedBy.*.required' => 'The receiver is required',            
        ];
        return $messages;
    }
}
