from json import load
from pathlib import Path
from typing import Any
import os

def json_message(msn: str) -> dict:
    return {"Message": f"{msn}"}


def create_folder_if_not_exist(path: Path):
    try:
        path.mkdir(parents=True, exist_ok=False)
        print("--- Folder was created")
    except FileExistsError:
        print("--- Folder is already there")


def read_json_file_from(path: str) -> list:
    with open(path, "r") as file_object:
        json_data = load(file_object)
    return json_data


def save_file_to_folder(data, folder_path, filename):
    create_folder_if_not_exist(folder_path)
    with open(os.path.join(folder_path, filename), 'wb') as f:
        f.write(data)
