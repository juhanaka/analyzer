#!/usr/bin/env python
import os
import sys

path = '/Users/juhanakangaspunta/own_code/data_analysis_tool/dev/'
if path not in sys.path:
  sys.path.append(path)

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "analyzer.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
