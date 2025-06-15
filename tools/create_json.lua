local json = dofile("lib/dkjson.lua");

local lfs = require("lfs")

local sections = {}

local folders = {}

local folder_path = "./src/pages/glossary"

for file in lfs.dir(folder_path) do
    if file ~= "." and file ~= ".." then
        local full_path = folder_path .. "/" .. file

        local attr = lfs.attributes(full_path)
        if attr.mode == "file" then
            if string.match(file, "%.mdx$") then
                table.insert(folders, file)
            end
        elseif attr.mode == "directory" then
        end
    end
end

for i, v in ipairs(folders) do
    local file = io.open(folder_path .. "/" .. v)
    if file then
        local content = file:read("*a")
        if content and content ~= "" then
            local frontmatter = content:match("^%-%-%-\n(.-)\n%-%-%-")

            if frontmatter then
                local title = nil
                local category = nil

                for line in frontmatter:gmatch("[^\n]+") do
                    local t = line:match("^title:%s*(.-)%s*$")
                    if t then
                        title = t:gsub('^["\'](.-)["\']$', "%1")
                    end

                    local c = line:match("^category:%s*(.-)%s*$")
                    if c then
                        category = {}
                        for word in c:gmatch('"([^"]+)"') do
                            table.insert(category, word)
                        end
                    end
                end
                table.insert(sections, {
                    file = folders[i],
                    title = title,
                    category = category
                })
            else
                print("No frontmatter found")
            end
        end
    end
end

local output = json.encode(sections, { indent = true })

local outputFile = io.open("data/output.json", "w")

if outputFile then
    outputFile:write(output)
    outputFile:close()
end