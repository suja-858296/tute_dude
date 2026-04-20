import speech_recognition as sr
import pyttsx3
import pyautogui
import subprocess
import time

# Initialize the text-to-speech engine
engine = pyttsx3.init()

# Optional: Change the voice to sound more like a standard assistant
voices = engine.getProperty('voices')
if len(voices) > 4:
    engine.setProperty('voice', voices[0].id) 

def speak(text):
    """Converts text to speech."""
    print(f"Jarvis: {text}")
    engine.say(text)
    engine.runAndWait()

def listen(prompt=None):
    """Listens to the microphone and returns the spoken text as a string."""
    if prompt:
        speak(prompt)
        
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("\n[Listening...]")
        # Adjust for ambient noise to improve accuracy
        recognizer.adjust_for_ambient_noise(source, duration=0.5)
        audio = recognizer.listen(source)

    try:
        query = recognizer.recognize_google(audio).lower()
        print(f"You said: '{query}'")
        return query
    except sr.UnknownValueError:
        # If it doesn't understand, it returns silently so the loop can continue
        return ""
    except sr.RequestError:
        print("[Error: Check your internet connection]")
        return ""

def execute_command(command):
    if not command:
        return

    # Using "notepad" as the trigger so you don't have to change your habits
    if "open notepad" in command or "open textedit" in command:
        speak("Opening TextEdit, sir.")
        # Fix: Split the command into separate list items
        subprocess.Popen(["open", "-a", "TextEdit"]) 

    elif "open" in command:
        # This allows you to say "Open Safari" or "Open Calculator"
        app_name = command.replace("open ", "").strip()
        speak(f"Attempting to open {app_name}, sir.")
        subprocess.Popen(["open", "-a", app_name])


    elif "type for me" in command:
        text_to_type = listen("What would you like me to type?")
        if text_to_type:
            speak("Typing now.")
            # Adds a small delay to give you time to click on a text box
            time.sleep(2) 
            pyautogui.write(text_to_type, interval=0.05)

    elif "volume up" in command:
        speak("Increasing volume.")
        for _ in range(5): # Press volume up 5 times
            pyautogui.press('volumeup')

    elif "volume down" in command:
        speak("Decreasing volume.")
        for _ in range(5):
            pyautogui.press('volumedown')

    elif "mute" in command:
        speak("Muting audio.")
        pyautogui.press('volumemute')

    elif "shut down" in command or "sleep" in command or "shutdown" in command:
        speak("Powering down systems. Goodbye, sir.")
        exit()

    else:
        speak("I am not programmed to handle that command yet.")

# --- Main Execution Block ---
if __name__ == "__main__":
    speak("Systems online and ready.")
    
    while True:
        # 1. Listen continuously for the wake word
        wake_word = listen()
        
        # 2. If "jarvis" is heard, activate command mode
        if "jarvis" in wake_word:
            # 3. Listen for the actual command
            active_command = listen("Yes sir?")
            
            # 4. Execute the command
            execute_command(active_command)