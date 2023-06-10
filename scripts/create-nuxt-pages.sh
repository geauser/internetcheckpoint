cd backups
for file in *.json;
  do echo "<template>\n\t<Page video-id=\"${file%.json}\" />\n</template>" > ../packages/website/pages/${file%.json}.vue;
done
