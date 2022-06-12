delimiter $$
drop function if exists `initials`$$
CREATE FUNCTION `initials`(str text, expr text) RETURNS text CHARSET utf8
begin
    declare result text default '';
    declare buffer text default '';
    declare i int default 1;
    if(str is null) then
        return null;
    end if;
    set buffer = trim(str);
    while i <= length(buffer) do
        if substr(buffer, i, 1) regexp expr then
            set result = concat( result, substr( buffer, i, 1 ));
            set i = i + 1;
            while i <= length( buffer ) and substr(buffer, i, 1) regexp expr do
                set i = i + 1;
            end while;
            while i <= length( buffer ) and substr(buffer, i, 1) not regexp expr do
                set i = i + 1;
            end while;
        else
            set i = i + 1;
        end if;
    end while;
    return result;
end$$

drop function if exists `acronym`$$
CREATE FUNCTION `acronym`(str text) RETURNS text CHARSET utf8
begin
    declare result text default '';
    set result = initials( str, '[[:alnum:]]' );
    return result;
end$$
delimiter ;

-- https://stackoverflow.com/questions/26015160/deterministic-no-sql-or-reads-sql-data-in-its-declaration-and-binary-logging-i